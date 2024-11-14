# Omie Toolkit  (🚧 WIP)

This repository contains the Omie Toolkit, a set of tools to help you interact with the Omie Integration Service.



## Disclaimer
**Please do not use this toolkit for any production purposes. This toolkit is still under development and is not ready for production use.**


## Installation

This projects runs with *yarn*.
Be sure to use `node v.18.0.0` or higher when running. 

In order to run this project in your environment, follow the steps:

1. Clone the repository 
```bash 
git clone git@github.com:mecanizou-eco/omie-toolkit.git
```

2. Install the dependencies 
 ```bash
yarn install
```




## Usage

The commands used for the tools are created with the [Commander](https://www.npmjs.com/package/commander?activeTab=code) and [Prompts](https://www.npmjs.com/package/prompts) packages. Each command shall trigger one or more prompts.

Be aware of the prompts and check the informations before following with the executions

**❗ About Credentials**

The commands have interactions with the Mecanizou environment on AWS, such as publishing in queues. 

Those interactions require the input of AWS credentials. Refer to `.env.example` to check the required credentials. 

The credentials may be found on the `/start` aws page upon accessing  ` 'Command line or programmatic access' `. 

❗Be sure to get the proper credentials to the environment you are working on

## Commands

## Order (🚧 WIP)


### Create Order
---
Create the order messages from the CSV file and send them to the SNS topic

```bash
yarn cli omie:order:create <csv-file>
```

## Tax Receipt (🚧 WIP)

### Create Tax Receipt From Omie
---
  Create the tax receipt messages from the CSV file and send them to the SNS topic.
  This command will also check if the tax receipt already exists in the database, this means that it will only send the tax receipt to the SNS topic if it does not exist in the database


```bash
yarn cli omie:tax-receipt:create <csv-file>
```

## Contributing

Contributions are welcome. Please see the [CONTRIBUTING](CONTRIBUTING.md) file for more information.

## License

This package is private and proprietary software of Mecanizou. For more information on the licensing terms, see the [LICENSE](LICENSE) file.
