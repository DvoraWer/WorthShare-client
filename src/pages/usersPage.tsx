import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getUsers, updateUserRole, updateUserStatus } from "../api/adminApi"
import { useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import type { AdminUser } from "../types/auth";

const UsersPage=()=>
{
    const queryClient=useQueryClient();
    const {data,isPending,isError}=useQuery({
        queryKey:['admin','users'],
        queryFn:()=>getUsers()
    })
     const context = useContext(UserContext);
     if(!context)
        throw new Error('UsersPage must be inside UserProvider');
     const { user } = context;

     const handleSuccess=()=>
     {
        queryClient.invalidateQueries({ queryKey: ['admin','users'] });
     }

     const handleError=(error:Error)=>
     {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
            alert('לא ניתן לבצע: אי אפשר לשנות את החשבון שלך או את המנהל האחרון');
        } else {
            alert('אירעה שגיאה, נסה שוב');
        }
     }

     const statusMutation=useMutation({
        mutationFn:(u: AdminUser) => updateUserStatus(u.id, !u.isActive),
        onSuccess:handleSuccess,
        onError:handleError,
     })
     const roleMutation=useMutation({
        mutationFn:(u:AdminUser)=>updateUserRole(u.id,u.role==='Admin'?'User':'Admin'),
        onSuccess:handleSuccess,
        onError:handleError,
     })

     const isBusy = statusMutation.isPending || roleMutation.isPending;

    if(isPending)
        return <p>בטעינה...</p>
    if(isError)
        return <p role="alert">אירעה שגיאה, נסה שוב</p>

    return(
<table>
  <thead>
    <tr> <th>שם</th> <th>אימייל</th> <th>תפקיד</th> <th>סטטוס</th> <th>פעולות</th> </tr>
  </thead>
  <tbody>
    {data.items.map((u) => (
      <tr key={u.id}>
        <td>{u.fullName}</td>
        <td>{u.email}</td>
        <td>{u.role==='Admin'?"מנהל":"משתמש רגיל"}</td>
        <td>{u.isActive?"פעיל":"חסום"}</td>
        <td>
          {u.id===user?.id ? (
            <span>(את/ה)</span>
          ) : (
            <>
              <button type="button" onClick={() => statusMutation.mutate(u)} disabled={isBusy}>{u.isActive ? 'חסימה' : 'שחרור'}</button>
              <button type="button" onClick={() => roleMutation.mutate(u)} disabled={isBusy}>{u.role === 'Admin' ? 'הסרת הרשאת מנהל' : 'הפיכה למנהל'}</button>
            </>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>

    )
}
export default UsersPage
