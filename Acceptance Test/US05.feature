Feature: US05 - Consulta de tiempo estimado de transporte
  Como turista
  Quiero ver el tiempo estimado de llegada del transporte público
  Para gestionar mejor mi tiempo de visita

  Scenario: E1: Consultar tiempo estimado de llegada en una parada específica
    Given que el usuario está en la pantalla principal de la aplicación
    And selecciona la parada <Parada>
    When accede a la opción de "Ver tiempo estimado de transporte"
    Then el sistema muestra el <tiempo de llegada> del próximo bus

    Examples: INPUT
    | Parada                    |
    | Estación Central          |

    Examples: OUTPUT
    | tiempo de llegada                           |
    | Próximo bus en 5 minutos                    |

  Scenario: E2: Consultar tiempo de llegada para varias rutas en una parada
    Given que el usuario ha seleccionado una parada
    When accede a la opción de "Ver todas las rutas disponibles"
    Then el sistema muestra una lista de tiempos de llegada para cada ruta

    Examples: INPUT
    | Parada                   |
    | Plaza Mayor              |

    Examples: OUTPUT
    | ruta        | tiempo de llegada |
    | Ruta 10     | 3 minutos         |
    | Ruta 15     | 8 minutos         |
    | Ruta 20     | 12 minutos        |

  Scenario: E3: Mostrar advertencia cuando no hay buses disponibles
    Given que el usuario selecciona una parada con poca frecuencia de buses
    When accede a la opción de "Ver tiempo estimado de transporte"
    Then el sistema muestra un <mensaje de advertencia> indicando que no hay buses disponibles en ese momento
    And sugiere al usuario ver opciones de rutas alternativas

    Examples: OUTPUT
    | mensaje de advertencia                     |
    | No hay buses disponibles en esta parada en este momento |
