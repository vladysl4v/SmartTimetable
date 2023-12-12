import {FilterSelector} from "../FilterSelector/FilterSelector.jsx";

export const OutageGroupSection = ({defaultValues, setValue, filtersData}) => {
    return (
        <div className='mb-4'>
            <p style={{marginTop: '20px'}}>Налаштування групи відключень світла</p>
            <FilterSelector title="Оберіть групу відключень" data={filtersData.outageGroups} zeroOptionTitle="Не показувати" selectedValue={defaultValues.outageGroup} onChanged={(args) => setValue('outageGroup', args.target.value)} />
        </div>
    );
};