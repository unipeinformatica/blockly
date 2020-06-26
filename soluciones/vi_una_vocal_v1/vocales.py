from consola import leer_caracter
from consola import leer_entrada_completa
from consola import obtener_caracter
from consola import avanzar_caracter
from consola import hay_mas_caracteres
from consola import imprimir
from consola import cambiar_color_texto

def Vocales():
  while hay_mas_caracteres():
    Imprimir__22hay_una_vocal_22_si_es_una_vocal()
    avanzar_caracter()

def Imprimir__22hay_una_vocal_22_si_es_una_vocal():
  if es_una_a():
    imprimir('Vi una vocal')
    imprimir('\n')
  else:
    if es_una_e():
      imprimir('Vi una vocal')
      imprimir('\n')
    else:
      if es_una_i():
        imprimir('Vi una vocal')
        imprimir('\n')
      else:
        if es_una_o():
          imprimir('Vi una vocal')
          imprimir('\n')
        else:
          if es_una_u():
            imprimir('Vi una vocal')
            imprimir('\n')

def es_una_a():
  return leer_caracter() == 'a'

def es_una_e():
  return leer_caracter() == 'e'

def es_una_i():
  return leer_caracter() == 'i'

def es_una_o():
  return leer_caracter() == 'u'

def es_una_u():
  return leer_caracter() == 'o'


Vocales()
