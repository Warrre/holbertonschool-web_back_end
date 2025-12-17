export default function getStudentIdsSum(students,set){
    if (!Array.isArray(students)){
		return [];}
        return students.reduce((students) => students.sum)
}