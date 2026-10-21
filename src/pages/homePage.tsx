import { useState } from "react";
import { keepPreviousData, useQuery ,useMutation,useQueryClient} from "@tanstack/react-query"
import { getRecommendations } from "../api/recommendationsApi"
import RecommendationCard from "../components/recommendationCard";
import type { RecommendationFilters } from "../types/recommendation";
import { getCategories } from "../api/categoriesApi";
import {removeFavorite ,getFavoriteIds,addFavorite }from "../api/favoritesApi"
const SORT_OPTIONS = {
    newest: { sortBy: 'createdAt', sortOrder: 'desc' },
    oldest: { sortBy: 'createdAt', sortOrder: 'asc' },
    title: { sortBy: 'title', sortOrder: 'asc' },
} as const;

type SortOption = keyof typeof SORT_OPTIONS;

const HomePage = () => {
    const [search, setSearch] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [sort, setSort] = useState<SortOption>('newest');
const [page,setPage]=useState(1);
    const filters: RecommendationFilters = {
        search,
        categoryId: categoryId ? Number(categoryId) : undefined,
        page,
        ...SORT_OPTIONS[sort],
    };

const {data:categoriesData}=useQuery({
   queryKey:['categories'],
   queryFn:()=>getCategories()
})
const { data: favoritesData } = useQuery({
    queryKey: ['favorites', 'ids'],
    queryFn: getFavoriteIds,
});
const queryClient=useQueryClient();
const addFavoriteMutation=useMutation({
    mutationFn:addFavorite,
    onSuccess:()=>queryClient.invalidateQueries({queryKey:['favorites']})
})
const removeFavoriteMutation=useMutation({
    mutationFn:removeFavorite,
    onSuccess:()=>queryClient.invalidateQueries({queryKey:['favorites']})
})
const toggleFavorite = (id: number, isFavorite: boolean) => {
    if (isFavorite) removeFavoriteMutation.mutate(id);
    else addFavoriteMutation.mutate(id);
};
    const { data, isPending, isError } = useQuery({
        queryKey: ['recommendations', filters],
        queryFn: () => getRecommendations(filters),
        placeholderData: keepPreviousData
    });
    if (isPending) return <p>טוען המלצות...</p>
    if (isError) return <p role="alert">לא הצלחנו לטעון את ההמלצות. נסה שוב מאוחר יותר.</p>
    return <section>
        <h1>ההמלצות שלנו--</h1>

        <label htmlFor="search">חיפוש</label>
        <input
            id="search"
            type="search"
            value={search}
             placeholder="חפשו כאן..."
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />

        <label htmlFor="category">קטגוריה</label>
        <select
            id="category"
            value={categoryId}
            onChange={(e) => { setCategoryId(e.target.value); setPage(1); }}
        >
            <option value="">כל הקטגוריות</option>
            {categoriesData?.items.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
        </select>

        <label htmlFor="sort">מיון</label>
        <select
            id="sort"
            value={sort}
            onChange={(e) => { setSort(e.target.value as SortOption); setPage(1); }}
        >
            <option value="newest">החדשות ביותר</option>
            <option value="oldest">הישנות ביותר</option>
            <option value="title">לפי א"ב</option>
        </select>

        {data.items.length === 0
            ? <p>לא נמצאו המלצות.</p>
            : data.items.map((rec) => {
                const isFav = favoritesData?.ids.includes(rec.id) ?? false;
                return (
                    <RecommendationCard
                        key={rec.id}
                        recommendation={rec}
                        isFavorite={isFav}
                        onToggleFavorite={() => toggleFavorite(rec.id, isFav)}
                    />
                );
            })}
            <div>
                <button type="button" onClick={()=>setPage(page-1)} disabled={page === 1}>הקודם</button>
                <span>עמוד {page} מתוך {data.pagination.totalPages}</span>
                <button type="button" onClick={()=>setPage(page+1)} disabled={page >= data.pagination.totalPages}>הבא</button>
            </div>
    </section>
}
export default HomePage
