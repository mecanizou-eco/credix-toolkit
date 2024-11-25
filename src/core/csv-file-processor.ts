import { readFile } from 'fs-extra'
import { parse } from 'papaparse'
import { resolve } from 'path'
import { z } from 'zod'

import { convertNullValuesToEmptyStrings } from '@/utils/string-clean-up.utils'

export class CsvFileProcessor<T> {
  constructor(private readonly schema: z.ZodSchema<T>) {}

  async parseFile(filePath: string): Promise<T[]> {
    const fileContent = await readFile(resolve(filePath), 'utf-8')

    return new Promise((resolve, reject) => {
      let line = 0
      const records: T[] = []
      const errors: Array<{ line: number; column: string; reason: string }> = []
      const pathToColumn = (path: (string | number)[]) => path.join(', ').replace(/, ([^,]*)$/, ' and $1')
      const step = ({ data, errors: parseErrors }) => {
        if (parseErrors.length > 0) {
          errors.push(
            ...parseErrors.map((error: { row: number; message: string }) => ({
              line: error.row + 2,
              column: 'Parsing Error',
              reason: error.message,
            })),
          )
        } else {
          line++
          data = this.cast(data)
          const validationResult = this.schema.safeParse(data) as z.SafeParseError<z.infer<typeof this.schema>>
          if (!validationResult.success) {
            validationResult.error.issues.forEach(issue => {
              errors.push({
                line,
                column: pathToColumn(issue.path),
                reason: issue.message,
              })
            })
          } else records.push(data)
        }
      }
      const error = (error: Error) => reject(error)
      const complete = () => {
        if (errors.length > 0) reject(errors)
        else resolve(records)
      }
      parse(fileContent, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        step,
        error,
        complete,
      })
    })
  }

  removeDuplicateRecords = (orders: T[]) => {
    const uniqueRecords = orders.reduce((acc, current) => {
      const isDuplicate = acc.some(item => JSON.stringify(item) === JSON.stringify(current))
      if (!isDuplicate) acc.push(current)

      return acc
    }, [] as T[])

    return uniqueRecords
  }

  cast(data: object) {
    data = convertNullValuesToEmptyStrings(data)

    return data
  }
}
