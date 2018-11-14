import * as React from 'react'
import { injectIntl } from 'react-intl'
import { GcQuery, GcMutation, Context } from 'gocommerce.gc-utils'
import { PaymentForm } from 'gocommerce.admin-gateway'
import getPayment from './graphql/getPayment.gql'
import savePayment from './graphql/savePayment.gql'
import authorizePayment from './graphql/authorizePayment.gql'

interface PaymentFormProps {
  intl: any
}

interface PaymentFormState {}

class PaymentFormComponent extends React.PureComponent<PaymentFormProps, PaymentFormState> {
  render() {
    const paymentSchema = {
      "title": "PagSeguro",
      "properties": {
        "boxGeneral": {
          "title": "General",
          "id": "general",
          "fields": {
            "rule.isDefault": {
              "type": "boolean",
              "widget": "hidden",
              "title": "isDefault"
            },
            "paymentAlias": {
              "type": "string",
              "widget": "hidden",
              "title": "paymentAlias"
            },
            "interestRate": {
              "type": "string",
              "widget": "hidden",
              "title": "interestRate"
            },
            "creditCardActive": {
              "type": "boolean",
              "widget": "toggle",
              "required": true,
              "options": [
                {
                  "value": false,
                  "label": "No"
                },
                {
                  "value": true,
                  "label": "Yes"
                }
              ],
              "title": "Cartão ativo"
            },
            "redirectActive": {
              "type": "boolean",
              "widget": "toggle",
              "required": true,
              "options": [
                {
                  "value": false,
                  "label": "No"
                },
                {
                  "value": true,
                  "label": "Yes"
                }
              ],
              "title": "Redirect ativo"
            },

            "minimumValue": {
              "type": "number",
              "widget": "currency",
              "title": "Valor mínimo",
              "description": "Valor mínimo para exibir esta forma de pagamento"
            }
          }
        },
        "boxApplicationSetup": {
          "title": "Application Setup",
          "button": "Instalar aplicativo",
          "id": "applicationSetup",
          "showFieldsOnlyAuthorized": true,
          "fields": {}
        },

        "boxInstallments": {
          "title": "Installments",
          "id": "installments",
          "fields": {
            "minimumInstallmentValue": {
              "type": "number",
              "widget": "currency",
              "title": "Valor mínimo da parcela"
            },
            "installments": {
              "fields": {
                "numberOfInstallments": {
                  "required": true,
                  "type": "boolean",
                  "widget": "select",
                  "title": "Número de parcelas",
                  "options": [
                    {
                      "value": 1,
                      "label": "1x"
                    },
                    {
                      "value": 2,
                      "label": "2x"
                    },
                    {
                      "value": 3,
                      "label": "3x"
                    },
                    {
                      "value": 4,
                      "label": "4x"
                    },
                    {
                      "value": 5,
                      "label": "5x"
                    },
                    {
                      "value": 6,
                      "label": "6x"
                    },
                    {
                      "value": 7,
                      "label": "7x"
                    },
                    {
                      "value": 8,
                      "label": "8x"
                    },
                    {
                      "value": 9,
                      "label": "9x"
                    },
                    {
                      "value": 10,
                      "label": "10x"
                    },
                    {
                      "value": 11,
                      "label": "11x"
                    },
                    {
                      "value": 12,
                      "label": "12x"
                    }
                  ]
                },
                "numberOfInstallmentsInterestFree": {
                  "required": true,
                  "type": "boolean",
                  "widget": "select",
                  "title": "Parcelas sem juros",
                  "options": [
                    {
                      "value": 1,
                      "label": "1x"
                    },
                    {
                      "value": 2,
                      "label": "2x"
                    },
                    {
                      "value": 3,
                      "label": "3x"
                    },
                    {
                      "value": 4,
                      "label": "4x"
                    },
                    {
                      "value": 5,
                      "label": "5x"
                    },
                    {
                      "value": 6,
                      "label": "6x"
                    },
                    {
                      "value": 7,
                      "label": "7x"
                    },
                    {
                      "value": 8,
                      "label": "8x"
                    },
                    {
                      "value": 9,
                      "label": "9x"
                    },
                    {
                      "value": 10,
                      "label": "10x"
                    },
                    {
                      "value": 11,
                      "label": "11x"
                    },
                    {
                      "value": 12,
                      "label": "12x"
                    }
                  ],
                  "description": "Número de parcelas sem juros para esta forma de pagamento."
                }
              }
            }
          }
        }
      },
      "additionalData": {
        "requireAuthorize": true
      },
      "initialValues": {
        "paymentAlias": "mercadopagov1",
        "creditCardActive": false,
        "redirectActive": false,
        "numberOfInstallments": 12,
        "numberOfInstallmentsInterestFree": 1,
        "bankInvoiceActive": "false"
      }
    }

    return (
      <GcQuery
        ssr={false}
        notifyOnNetworkStatusChange={true}
        fetchPolicy="network-only"
        errorPolicy="all"
        query={getPayment}
        variables={{
          id: 'pagseguro'
        }}
      >
        {getPayment => {
          return (
            <GcMutation mutation={authorizePayment}>
              {(authorizePayment, dataAuthorizePaymentment) => (
                <GcMutation mutation={savePayment}>
                  {(savePayment, dataSavePayment) => (
                    <Context.AccountContext.Consumer>
                      {({ accountData }) => (
                        <Context.GlobalNotificationsContext.Consumer>
                          {global => {
                            return (
                              <PaymentForm
                                account={accountData}
                                openAlert={global.openAlert}
                                paymentId="pagseguro"
                                intl={this.props.intl}
                                paymentSchema={paymentSchema}
                                paymentDetails={getPayment.data.payment}
                                savePayment={savePayment}
                                authorizePayment={authorizePayment}
                                isLoadingSavePayment={dataSavePayment.loading}
                                isLoadingAuthorizePayment={dataAuthorizePaymentment.loading}
                              />
                            )
                          }}
                        </Context.GlobalNotificationsContext.Consumer>
                      )}
                    </Context.AccountContext.Consumer>
                  )}
                </GcMutation>
              )}
            </GcMutation>
          )
        }}
      </GcQuery>
    )
  }
}

export default injectIntl(PaymentFormComponent)
