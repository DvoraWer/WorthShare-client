import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import type { CategoryInput } from '../types/category';

const schema=yup.object(
    {
name:yup.string().trim().required("שדה חובה").max(100,"מקסימום 100 תווים"),
  description: yup.string().trim().default('').max(500, 'לא לחרוג מ500 תווים לתיאור')
    }
)
interface CategoryFormProps {
    onSubmit: (data: CategoryInput) => void
    defaultValues?: CategoryInput
    isSubmitting: boolean
    submitLabel: string
    onCancel?:()=>void
}
const CategoryForm=({onSubmit,defaultValues,isSubmitting,submitLabel,onCancel}:CategoryFormProps)=>
{
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });

    return (
        <form className="form panel" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
                <label htmlFor="name">שם הקטגוריה</label>
                <input id="name" type="text" {...register('name')} />
                {errors.name && <p role="alert">{errors.name.message}</p>}
            </div>

            <div>
                <label htmlFor="categoryDescription">תיאור (אופציונלי)</label>
                <textarea id="categoryDescription" rows={3} placeholder="תיאור קצר" {...register('description')} />
                {errors.description && <p role="alert">{errors.description.message}</p>}
            </div>

            <button className="btn btn-accent" type="submit" disabled={isSubmitting}>{submitLabel}</button>
            {onCancel && <button type="button" onClick={onCancel}>ביטול</button>}
        </form>
    );
}
export default CategoryForm
