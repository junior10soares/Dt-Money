import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import logoImg from '../../assets/logo.svg'
import * as Dialog from '@radix-ui/react-dialog' // biblioteca modal
import { NewTransactionModal } from '../NewTransactionModal'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          <Dialog.Trigger
            asChild /* usa o botao ja criado asChild é para nao criar outro button */
          >
            <NewTransactionButton>Nova Transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>

      </HeaderContent>
    </HeaderContainer>
  )
}
