from consola import leer_caracter
from consola import leer_entrada_completa
from consola import obtener_caracter
from consola import avanzar_caracter
from consola import hay_mas_caracteres
from consola import imprimir
from consola import cambiar_color_texto

letra = None

def Vocales():
  global letra
  while hay_mas_caracteres():
    if es_una_vocal():
      imprimir('Vi una vocal')
      imprimir('\n')
    avanzar_caracter()

def es_un_caracter(letra):
  return leer_caracter() == letra

def es_una_vocal():
  global letra
  return es_un_caracter('a') or es_un_caracter('e') or es_un_caracter('i') or es_un_caracter('o') or es_un_caracter('u')


Vocales()
