# stock_tracker
Aplicação para monitorar ações na bolsa de valores.

## Passos de instalação
### Passo 1:
Com o projeto clonado na sua máquina, crie um arquivo denominado settings.ini que vai configurar as suas credenciais para o envio de email.
Exemplo do conteúdo desse arquivo:

EMAIL_HOST_USER = Email_Usado_Para_Envio@gmail.com
EMAIL_HOST_PASSWORD = senhaDoEmail
EMAIL_RECEIVER = Email_do_destinatario@gmail.com

### Passo 2:
Com docker instalado na sua máquina, rode o comando para buildar o projeto:

docker compose build

ou 

docker-compose build

### Passo 3:
Inicie os Containers:

docker compose up -d

ou 

docker-compose up -d
