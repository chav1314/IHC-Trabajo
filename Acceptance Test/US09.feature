Feature: US09 - Alertas de cambios en el transporte público
  Como turista
  Quiero recibir alertas de cambios o retrasos en el transporte público
  Para ajustar mi itinerario en tiempo real

  Scenario: E1: Recibir notificación de cambio de ruta por tráfico
    Given que el usuario está en una ruta activa
    And la aplicación detecta tráfico en la ruta
    When ocurre una modificación en el tiempo de espera
    Then el sistema envía una <notificación en tiempo real> informando del cambio

    Examples: OUTPUT
    | notificación en tiempo real                                |
    | Tráfico en la ruta hacia Miraflores, retraso de 15 minutos |

  Scenario: E2: Recibir notificación de cierre temporal de ruta
    Given que el usuario está en una ruta activa
    And la aplicación detecta un cierre temporal en la ruta
    When ocurre una modificación en el recorrido
    Then el sistema envía una <notificación en tiempo real> indicando el cierre de la ruta y sugiriendo alternativas

    Examples: OUTPUT
    | notificación en tiempo real                                |
    | Ruta hacia Barranco cerrada temporalmente. Alternativa: Ruta 30 |

  Scenario: E3: Recibir alerta de cambio de parada en ruta
    Given que el usuario está en una ruta activa
    And la aplicación detecta que una parada ha sido cambiada
    When se actualiza el recorrido de la ruta
    Then el sistema envía una <notificación en tiempo real> informando del cambio de parada

    Examples: OUTPUT
    | notificación en tiempo real                                |
    | La parada 'Plaza San Martín' ha sido movida una cuadra adelante |
