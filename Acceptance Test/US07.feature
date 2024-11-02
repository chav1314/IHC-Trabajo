Feature: US07 - Configuración de rutas favoritas
  Como usuario
  Quiero poder guardar mis rutas favoritas
  Para acceder a ellas fácilmente en futuros viajes

  Scenario: E1: Guardar una ruta como favorita
    Given que el usuario ha seleccionado una ruta
    When elige la opción de "Guardar como favorita"
    Then el sistema almacena la <ruta seleccionada> en su perfil en la sección de "Rutas Favoritas"

    Examples: INPUT
    | ruta seleccionada           |
    | Ruta 18 - Miraflores a Barranco |

  Scenario: E2: Acceder a la lista de rutas favoritas
    Given que el usuario tiene rutas guardadas en su perfil
    When accede a la sección "Rutas Favoritas"
    Then el sistema muestra la lista de <rutas favoritas> disponibles para acceso rápido

    Examples: OUTPUT
    | rutas favoritas               |
    | Ruta 18 - Miraflores a Barranco, Ruta 20 - Centro a Surco |

  Scenario: E3: Eliminar una ruta de favoritos
    Given que el usuario tiene rutas guardadas en su perfil
    When selecciona una ruta y elige "Eliminar de favoritos"
    Then el sistema elimina la <ruta seleccionada> de la lista de favoritos
    And muestra un mensaje confirmando la eliminación

    Examples: INPUT
    | ruta seleccionada           |
    | Ruta 18 - Miraflores a Barranco |
