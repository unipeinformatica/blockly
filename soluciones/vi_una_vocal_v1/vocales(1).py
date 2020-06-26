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
  if leer_caracter() == 'a':
    imprimir('Vi una vocal')
    imprimir('\n')
  else:
    if leer_caracter() == 'e':
      imprimir('Vi una vocal')
      imprimir('\n')
    else:
      if leer_caracter() == 'i':
        imprimir('Vi una vocal')
        imprimir('\n')
      else:
        if leer_caracter() == 'o':
          imprimir('Vi una vocal')
          imprimir('\n')
        else:
          if leer_caracter() == 'u':
            imprimir('Vi una vocal')
            imprimir('\n')


Vocales()
