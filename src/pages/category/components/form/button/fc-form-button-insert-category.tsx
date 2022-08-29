import { setCreatedAlert } from "@common/AlertFuncoes"
import { FcFormIconButtonAdd } from "@components/fc-forms/fc-form-button"
import { useSpin } from "@hooks/use-spin"
import { CategoryRequestDTO } from "api/category/dto"
import { ContextAlert } from "Context"

import { useCategory } from "pages/category/hook"
import { useFormCategory } from "pages/category/hook/use-form-category"
import { useContext } from "react"
import shallow from "zustand/shallow"

export default function FcFormButtonInsertCategory() {
  const insertCategory = useCategory(s => s.insertCategory)
  const { id, description: descricao, clearAllFields, setInvalidFields } = useFormCategory((s) => ({
    id: s.id,
    description: s.description,
    clearAllFields: s.clearAllFields,
    setInvalidFields: s.setInvalidFields
  }), shallow)
  const { setAlert } = useContext(ContextAlert)
  const setSpin = useSpin((s) => s.setSpin)
  const categoryRequest = CategoryRequestDTO.build({
    id,
    descricao,
  })

  return (
    <FcFormIconButtonAdd
      description="cadastrar"
      onClick={async () => {
        try {
          setSpin(true)
          const { status, message, internalMessage } = await insertCategory(categoryRequest)
          setAlert(setCreatedAlert(status, message, internalMessage))
          clearAllFields()
        } catch (error: any) {
          setInvalidFields(error?.invalidFields)
          setAlert(setCreatedAlert(error.status, error.detail, error.title))
        } finally {
          setSpin(false)
        }
      }}
    />
  )
}
