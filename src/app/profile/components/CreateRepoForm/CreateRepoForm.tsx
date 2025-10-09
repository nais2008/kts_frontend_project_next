import { useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { useUserReposStore } from "@/providers/UserReposProvider"
import { observer } from "mobx-react-lite"

import Error from "@/components/layout/Error"
import Button from "@/components/ui/Button"
import Checkbox from "@/components/ui/Checkbox"
import Input from "@/components/ui/Input"

import styles from "./CreateRepoForm.module.scss"

interface ICreateRepoFormState {
  name: string
  description: string
  isPrivate: boolean
}

interface CreateRepoFormProps {
  onRepoCreated: () => void
}

const CreateRepoForm = observer(({ onRepoCreated }: CreateRepoFormProps) => {
  const userReposStore = useUserReposStore()

  const [error, setError] = useState<string | null>(null)

  const { control, handleSubmit, formState } = useForm<ICreateRepoFormState>({
    defaultValues: {
      name: "",
      description: "",
      isPrivate: false,
    },
    mode: "onBlur",
  })

  const errorName = formState.errors.name?.message
  const errorDes = formState.errors.description?.message

  const onSubmit: SubmitHandler<ICreateRepoFormState> = async (data) => {
    setError(null)

    const params = {
      name: data.name,
      description: data.description || undefined,
      private: data.isPrivate,
      has_issues: true,
      has_wiki: true,
      has_downloads: true,
    }

    try {
      const success = await userReposStore.createRepository(params)

      if (success) {
        onRepoCreated()
      } else {
        setError(
          "Не удалось создать репозиторий. Проверьте имя и попробуйте снова."
        )
      }
    } catch (err) {
      console.error(err)
      setError("Произошла неизвестная ошибка при создании репозитория.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Error error={error ?? undefined} />

      <div className={styles.form__item}>
        <label htmlFor="name">
          Имя репозитория <span className={styles.form__required}>*</span>
        </label>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Имя репозитория обязательно" }}
          render={({ field }) => (
            <Input
              id="name"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
              disabled={formState.isSubmitting}
            />
          )}
        />
        <Error error={errorName} />
      </div>

      <div className={styles.form__item}>
        <label htmlFor="description">Описание (опционально)</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input
              id="description"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
              disabled={formState.isSubmitting}
            />
          )}
        />
        <Error error={errorDes} />
      </div>

      <div className={styles.form__item}>
        <Controller
          name="isPrivate"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="isPrivate"
              label="Сделать приватным"
              checked={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
              disabled={formState.isSubmitting}
            />
          )}
        />
      </div>

      <Button type="submit" disabled={formState.isSubmitting}>
        {formState.isSubmitting ? "Создание..." : "Создать репозиторий"}
      </Button>
    </form>
  )
})

export default CreateRepoForm
