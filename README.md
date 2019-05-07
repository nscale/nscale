<!--
logo
<img src="" width="400px" />
-->

### Serverless Platform for Seneca services

    Release small composable services with nscale

<!--Enterprise support plans are available. Please check the
[Prefessional Services](https://github.com/hapijs/hapi/blob/master/SUPPORT.md) for more information.-->

**nscale** is a microservices platform that makes it easy to build, deply, and scale seneca microservices. **hapi** enables
developers to focus on writing reusable application logic and foret about things like services meshes, centeralized logging, and other the other headaches of a decentralized system.

We currently only support seneca based services on the Node.js runtime.

For the latest updates and documentation visit [nscale.io](https://nscale.io).

## Installation

You can install the nscale cli by running:

```bash
npm install -g nscale
```

## Setup

**Create your namespace** by running:

```bash
nscale init your_namspace_name
```

**Add a service** by running:

```bash
nscale create your_service_name
```

> Note: make sure your inside your namespace directory.

## Running locally

To run your namespace locally you can use the nscale shell.

```bash
nscale start
```

Once the shell has started you can run all of your services locally using:

```bash
> start all
```
