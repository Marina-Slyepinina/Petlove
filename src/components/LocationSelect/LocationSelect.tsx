import AsyncSelect from "react-select/async";
import { useNoticesStore } from "../../store/noticesStore";
import { getCities } from "../../lib/api";
import css from "./LocationSelect.module.css";

interface CityOption {
    value: string;
    label: string;
}

export const LocationSelect = () => {

    const { setFilters } = useNoticesStore();

    const loadOptions = async (inputValue: string): Promise<CityOption[]> => {

        if (!inputValue || inputValue.length < 3) return [];

        try {
            const res = await getCities(inputValue);

            return res.map(city => ({
                value: city._id,
                label: `${city.stateEn} ${city.cityEn}`
            }))
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    return (
        <div className={css.wrapper}>
            <AsyncSelect<CityOption, false>
                cacheOptions
                defaultOptions={false}
                loadOptions={loadOptions}
                onChange={selected => {
                    setFilters({ locationId: selected?.value });
                }}
                placeholder='Location'
                classNamePrefix='location'
                className={css.select}
                isClearable
            />
        </div>
    )
}