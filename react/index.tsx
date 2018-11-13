import * as React from 'react'
import { PaymentModel } from 'gocommerce.admin-gateway'

interface IAppProps {
  children: React.ReactElement<any>
}

const Pagseguro: React.SFC<IAppProps> = props => {
  // return props.children
  return <PaymentModel>HAHAHAHA</PaymentModel>
}

export default Pagseguro
