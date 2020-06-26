from consola import leer_caracter
from consola import leer_entrada_completa
from consola import obtener_caracter
from consola import avanzar_caracter
from consola import hay_mas_caracteres
from consola import imprimir
from consola import cambiar_color_texto

caracter_de_entrada = None

def Texto_a_color():
  global caracter_de_entrada
  while hay_mas_caracteres():
    caracter_de_entrada = obtener_caracter()
    Decidir_color_de_texto()
    Imprimir_si_no_es_un_n_C3_BAmero()

def Decidir_color_de_texto():
  global caracter_de_entrada
  if el_caracter_es_1():
    cambiar_color_texto("#3366ff")
  if el_caracter_es_2():
    cambiar_color_texto("#ff4040")

def Imprimir_si_no_es_un_n_C3_BAmero():
  global caracter_de_entrada
  if not (el_caracter_es_1() or el_caracter_es_2()):
    imprimir(caracter_de_entrada)

def el_caracter_es_1():
  global caracter_de_entrada
  return '1' == caracter_de_entrada

def el_caracter_es_2():
  global caracter_de_entrada
  return '2' == caracter_de_entrada


Texto_a_color()
