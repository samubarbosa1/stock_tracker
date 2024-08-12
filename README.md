# stock_tracker
Aplicação para monitorar ações na bolsa de valores.

## Interface
![Stock Tracker Interface](/frontend/stock_tracker_front/public/Stock_Tracker_interface.jpg "Stock Tracker Interface")

## Vídeo do Funcionamento

Vídeo da aplicação sendo executada:
[Stock Tracker](https://drive.google.com/file/d/1CS3aGx4WKLEXnJtUQZFfeGMBvpUcT1Mj/view?usp=sharing)

## Passos de instalação
### Passo 1:
Com o projeto clonado na sua máquina, crie um arquivo denominado settings.ini que vai configurar as suas credenciais para o envio de email, e coloque esse arquivo na pasta do projeto.
Exemplo do conteúdo desse arquivo:

EMAIL_HOST_USER = email_usado_para_envio@gmail.com <br />
EMAIL_HOST_PASSWORD = senha_do_email <br />
EMAIL_RECEIVER = email_do_destinatario@gmail.com

### Passo 2:
Com docker instalado na sua máquina, rode o comando para buildar o projeto:

```Shell
docker compose build
```

ou 

```Shell
docker-compose build
```

### Passo 3:
Inicie os Containers:

```Shell
docker compose up -d
```

ou 

```Shell
docker-compose up -d
```
