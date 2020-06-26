from consola import leer_caracter
from consola import leer_entrada_completa
from consola import obtener_caracter
from consola import avanzar_caracter
from consola import hay_mas_caracteres
from consola import imprimir
from consola import cambiar_color_texto

min_C3_BAscula = None
may_C3_BAscula = None

def Buscar_vocales_e_imprimir():
  global min_C3_BAscula, may_C3_BAscula
  while hay_mas_caracteres():
    if es_una_vocal():
      imprimir('Vi una vocal')
      imprimir('\n')
    avanzar_caracter()

def es_una_vocal():
  global min_C3_BAscula, may_C3_BAscula
  return es_un_caracter('a', 'A') or es_un_caracter('e', 'E') or es_un_caracter('i', 'I') or es_un_caracter('o', 'O') or es_un_caracter('u', 'U')

def es_un_caracter(min_C3_BAscula, may_C3_BAscula):
  return leer_caracter() == may_C3_BAscula or leer_caracter() == min_C3_BAscula


Buscar_vocales_e_imprimir()
