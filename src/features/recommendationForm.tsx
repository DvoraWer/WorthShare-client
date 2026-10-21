import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/categoriesApi';
import type { RecommendationsInput } from '../types/recommendation';
const schema = yup.object(
    {
        title: yup.string().trim().required('חובה להזין כותרת').max(30, 'כותרת מכילה עד 30 תווים'),
        description: yup.string().trim().required('חובה להזין תיאור קצר').max(3000, 'לא לחרוג מ3000 תווים לתיאור'),
        categoryId: yup.number().required('יש לבחור קטגוריה').typeError('חובה לבחור קטגוריה'),
        url: yup.string().trim().default('').matches(/^https?:\/\/.+/, { message: 'הקישור חייב להיות תקין', excludeEmptyString: true })
    }
)
interface RecommendationFormProps {
    onSubmit: (data: RecommendationsInput) => void
    defaultValues?: RecommendationsInput
    isSubmitting: boolean
    submitLabel: string
}

const RecommendationForm = ({ onSubmit, defaultValues, isSubmitting, submitLabel }: RecommendationFormProps) => {
    const { data: categoriesData } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
                <label htmlFor="title">כותרת</label>
                <input id="title" type="text" {...register('title')} />
                {errors.title && <p role="alert">{errors.title.message}</p>}
            </div>

            <div>
                <label htmlFor="description">תיאור</label>
                <textarea id="description" rows={5} {...register('description')} />
                {errors.description && <p role="alert">{errors.description.message}</p>}
            </div>

            <div>
                <label htmlFor="categoryId">קטגוריה</label>
                <select id="categoryId" {...register('categoryId')}>
                    <option value="">בחרו קטגוריה</option>
                    {categoriesData?.items.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
                {errors.categoryId && <p role="alert">{errors.categoryId.message}</p>}
            </div>

            <div>
                <label htmlFor="url">קישור (אופציונלי)</label>
                <input id="url" type="url" placeholder="https://..." {...register('url')} />
                {errors.url && <p role="alert">{errors.url.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting}>{submitLabel}</button>
        </form>
    );
}
export default RecommendationForm
