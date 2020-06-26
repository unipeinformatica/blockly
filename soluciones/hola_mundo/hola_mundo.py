from consola import leer_caracter
from consola import leer_entrada_completa
from consola import obtener_caracter
from consola import avanzar_caracter
from consola import hay_mas_caracteres
from consola import imprimir
from consola import cambiar_color_texto

def Copiar_la_entrada():
  while hay_mas_caracteres():
    imprimir(leer_caracter())
    avanzar_caracter()


Copiar_la_entrada()
