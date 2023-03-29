import * as Dialog from '@radix-ui/react-dialog' // biblioteca modal
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const newTransactionFormShema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']), // um ou outro 'enum' quando tem 2 opçoes
})

export function NewTransactionModal() {
  const createTransaction = useContextSelector(TransactionsContext, (context) => {
    return context.createTransaction

  })

  type NewTransactionFormInputs = z.infer<typeof newTransactionFormShema>

  const {
    control, // form de controle é quando a infor vem do modal ou outro lugar, uncontroled é quando vem do input mesmo
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormShema),
    defaultValues: {
      type: 'income', // inicia o modal sempre a opção entrada marcada 'income'
    },
  })
  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, price, category, type } = data

    await createTransaction({
      description,
      category,
      price,
      type,
    })

    reset() // reseta os campos escritos
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content /* conteudo do modal */>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton /* x de fechar do modal */>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })} // converte o input p numero
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control} // control lá de cima
            name="type" // tipo income ou outcome
            render={({ field }) => {
              // retorna qual conteudo do type
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />
          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
