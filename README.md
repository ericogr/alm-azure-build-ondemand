# Build automatizado sob demanda (teste)

A ideia é criar integração contínua em um ambiente on-premise com uma máquina virtual no Azure sob-demanda, poupando recursos (dinheiro) enquanto a máquina está desligada (deallocated).

## O Processo

Ao realizar check-in, será disparado um gatilho pelo TFS (Service Hooks) ao serviço "Function" do Azure, que inicia uma máquina virtual e dispara o build nesta máquina.
Ao concluir o build, o TFS dispara outro gatinho (Service Hooks) ao serviço "Function" do Azure para desligar (deallocate) a máquina.

## Requisitos
 1. Conta Azure
 2. TFS 2015 ou mais atual
 3. Permissão na conta azure e TFS para criação de hooks, serviços, etc

## Azure

### Virtual Machine
 1. Prapare sua VM instalando os requisitos necessários para compilar a aplicação
 2. Instale o Agente de build do tfs
 3. Configure o agente de build

### Function
 1. Criar um grupo de recursos "build-poc"
 2. Criar o Serviço de aplicativos do tipo "Aplicativo de funções" (na busca digite função)
  2.1 Nomear p nome do aplicativo para "tfs-build-machine"
  2.2 Associar com o grupo de recursos "build-poc" (a criação pode demorar alguns instantes)
 3. Configurar a integração contínua apontando para este repositório github
 4. Abrir o arquivo alm-azure-build-ondemand/parameters.js e ajustar de acordo com seu ambiente
 
Obs: Os nomes não estão fixos no código, podemos alterar nos parâmetros de ambiente

### Links

https://docs.microsoft.com/en-us/azure/azure-functions/functions-continuous-deployment

## TFS

Em seu projeto, criar um Service Hook do tipo "Code Checked in" e outro do tipo "Build complete", especificar o filtro desejado e a url de sua function.

## Parâmetros de ambiente

```sh
AZURE_CLIENT_ID=
AZURE_SECRET=
AZURE_DOMAIN=
AZURE_SUBSCRIPTION_ID=
AZURE_VM_RESOURCE_GROUP_NAME=
AZURE_VM_NAME=
TFS_PROJECT_URL=
TFS_USERNAME=
TFS_PASSWORD=
TFS_WORKSTATION=
TFS_DOMAIN=
TFS_START_DELAY=
TFS_BUILD_ID=
TFS_BUILD_SOURCE_BRANCH=
TFS_BUILD_PARAMETERS=
```

## Exemplo

```sh
AZURE_CLIENT_ID=00000000-0000-0000-0000-000000000000
AZURE_SECRET=senha
AZURE_DOMAIN=dominioxpto.onmicrosoft.com
AZURE_SUBSCRIPTION_ID=00000000-0000-0000-0000-000000000000
AZURE_VM_RESOURCE_GROUP_NAME=build-poc
AZURE_VM_NAME=build-generic
TFS_PROJECT_URL=http://xpto.server.com.br:8080/tfs/DefaultCollection/Projeto
TFS_USERNAME=usernameDeRede
TFS_PASSWORD=senhaDeRede
TFS_WORKSTATION=maquinax
TFS_DOMAIN=empresa
TFS_START_DELAY=180000
TFS_BUILD_ID=1
TFS_BUILD_SOURCE_BRANCH=$/Projeto/Xpto/main
TFS_BUILD_PARAMETERS={"system.debug":"false","BuildConfiguration":"release","BuildPlatform":"any cpu"}
```

### TODO
Evoluir o script para atender a outros cenários e ambientes
