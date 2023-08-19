# CloudFullStack
Amazon EC2 connected with Amazon RDS on VPC

Criei uma VPC com uma subnet publica e uma privada, na subnet publica coloquei um EC2 com frontend, um EC2 com backend, um EC2 como Bastion Host (acabou perdendo a função quando passei o backend para a subnet publica devido a problemas de Proxy), um Internet Gateway e um NAT Gateway(também perdeu a função apos a mudança do backend). Na subnet privada coloquei o RDS.

Video explicação e demonstração: https://drive.google.com/file/d/1-ZTfQlAYRIOlaYwsjDFbFHlgkDoAIV-e/view?usp=sharing
