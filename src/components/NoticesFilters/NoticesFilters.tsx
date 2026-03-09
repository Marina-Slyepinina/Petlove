import { useNoticesStore } from "../../store/noticesStore";
import { SearchField } from "../SearchField/SearchField";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import { LocationSelect } from "../LocationSelect/LocationSelect";
import css from "./NoticesFilters.module.css";
import clsx from "clsx";


type SortType = 'popular' | 'unpopular' | 'cheap' | 'expensive';

const SORT_OPTIONS: { label: string; value: SortType }[] = [
  { label: 'Popular', value: 'popular' },
  { label: 'Unpopular', value: 'unpopular' },
  { label: 'Cheap', value: 'cheap' },
  { label: 'Expensive', value: 'expensive' },
];


export const NoticesFilters = () => {

  const { filters, setFilters, categories, sexes, species } = useNoticesStore();

  const getCurrentSort = () => {
    if (filters.byPrice === true) return 'cheap';
    if (filters.byPrice === false) return 'expensive';
    if (filters.byPopularity === true) return 'unpopular';
    if (filters.byPopularity === false) return 'popular';
    return null;
  }

  const currentSort = getCurrentSort();

  function handleSortChange(value: SortType) {
    if (value === currentSort) {
      setFilters({ byPopularity: undefined, byPrice: undefined });
      return;
    }
    if (value === 'cheap') setFilters({ byPrice: true, byPopularity: undefined });
    if (value === 'expensive') setFilters({ byPrice: false, byPopularity: undefined });
    if (value === 'unpopular') setFilters({ byPopularity: true, byPrice: undefined });
    if (value === 'popular') setFilters({ byPopularity: false, byPrice: undefined });
  }

  const handleSearch = (query: string) => {
    setFilters({ keyword: query });
  }

  return (
    <form className={css.form}>

      <div className={css.filterGroup}>
        <div className={css.searchfilterWrapper}>
          <SearchField placeholder="Search" onSearch={handleSearch} />
        </div>

        <div className={css.filterGroupRow}>
          <CustomSelect options={categories} placeholder='Category' onChange={(category) => setFilters({ category })} />
          <CustomSelect options={sexes} placeholder='By gender' onChange={(sex) => setFilters({ sex })} />
        </div>

        <CustomSelect options={species} placeholder='By type' onChange={(species) => setFilters({ species })} />

        <LocationSelect />
      </div>

      <div className={css.sortGroup}>
        {SORT_OPTIONS.map(({ label, value }) => {
          const isActive = currentSort === value;

          return (
            <button type="button" key={value} className={clsx(css.sortBtn, isActive && css.active)} onClick={() => handleSortChange(value)} >
              {label}
              {isActive && (
                <svg width={18} height={18} className={css.clearIcon}>
                  <use href="sprite.svg#cross-small"></use>
                </svg>)}
            </button>
          )
        })}
      </div>

    </form>
  )
}