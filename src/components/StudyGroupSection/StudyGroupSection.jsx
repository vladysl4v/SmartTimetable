import {FilterSelector} from "../FilterSelector/FilterSelector.jsx";

export const StudyGroupSection = ({defaultValues, setValue, filtersData}) => {
    return (
        <>
            <p>Налаштування навчальної групи</p>
            <div className="row justify-content-center sections mb-1">
                <FilterSelector title="Оберіть факультет" data={filtersData.faculties} selectedValue={defaultValues.faculty} onChanged={(args) => setValue('faculty', args.target.value)}/>
                <FilterSelector title="Оберіть форму" data={filtersData.educForms} selectedValue={defaultValues.educForm} onChanged={(args) => setValue('educForm', args.target.value)} style={{width:'50%'}}/>
                <FilterSelector title="Оберіть курс" data={filtersData.courses} selectedValue={defaultValues.course} onChanged={(args) => setValue('course', args.target.value)} style={{width:'50%'}}/>
                <FilterSelector title="Оберіть навчальну групу" data={filtersData.studyGroups} selectedValue={defaultValues.studyGroup} onChanged={(args) => setValue('studyGroup', args.target.value)}/>
            </div>
        </>
    );
};