import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import axios from 'axios';
import { getAdminCategories,createCategory,updateCategory,updateCategoryStatus } from "../api/adminApi";
import CategoryForm from "../features/categoryForm";
import type { AdminCategory, CategoryInput } from '../types/category'
const CategoriesPage=()=>
{
    const queryClient = useQueryClient();
    const [editing, setEditing] = useState<AdminCategory | null>(null);
const {data,isPending,isError}=useQuery({
    queryKey:['admin','categories'],
    queryFn:()=>getAdminCategories()
})
 const handleSuccess=()=>
     {
        queryClient.invalidateQueries({ queryKey: ['admin','categories'] });
        queryClient.invalidateQueries({queryKey:['categories']});
        setEditing(null);
     }
         const handleError=(error:Error)=>
     {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
            alert('קטגוריה בשם זה כבר קיימת, הזן שם חדש');
        } else {
            alert('אירעה שגיאה, נסה שוב');
        }
     }
     const createMutation=useMutation(
        {
            mutationFn:createCategory,
            onSuccess:handleSuccess,
            onError:handleError,
        }
     )
     const updateMutation=useMutation(
        {
            mutationFn:(data: CategoryInput) => updateCategory(editing!.id, data),
            onSuccess:handleSuccess,
            onError:handleError,
        }
     )
     const statusMutation=useMutation({
        mutationFn:(c: AdminCategory) => updateCategoryStatus(c.id, !c.isActive),
        onSuccess:handleSuccess,
        onError:handleError,
     })

     const handleSubmit = (data: CategoryInput) => {
    if (editing) updateMutation.mutate(data);
    else createMutation.mutate(data);
};
 const isBusy = statusMutation.isPending || updateMutation.isPending||createMutation.isPending;
  if(isPending)
        return <p>בטעינה...</p>
    if(isError)
        return <p role="alert">אירעה שגיאה, נסה שוב</p>
return(
    <section>
        <h2>{editing?'עריכת קטגוריה':'הוספת קטגוריה'}</h2>
        <CategoryForm key={editing?.id??'new'} onSubmit={handleSubmit} defaultValues={editing ? { name: editing.name, description: editing.description ?? '' } : undefined} isSubmitting={isBusy} submitLabel={editing?'שמירה':'הוספה'} onCancel={editing?()=>setEditing(null):undefined}/>

        <table>
          <thead>
            <tr> <th>שם</th> <th>תיאור</th> <th>סטטוס</th> <th>פעולות</th> </tr>
          </thead>
          <tbody>
            {data.items.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.description ?? '—'}</td>
                <td>{c.isActive ? 'פעילה' : 'מושבתת'}</td>
                <td>
                  <button type="button" onClick={()=>setEditing(c)} disabled={isBusy}>עריכה</button>
                  <button type="button" onClick={()=>statusMutation.mutate(c)} disabled={isBusy}>{c.isActive?'השבתה':'הפעלה'}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </section>
)
}
export default CategoriesPage