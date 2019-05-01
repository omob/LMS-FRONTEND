import { Course } from 'src/app/model/course';


export function extractDataFromCourseList(course){
    console.log(course)
    let fields = course.session.find(c => c.sessionName == this.course.session);
    return { ...course, ...fields }
}

export function extractDataFromCourse(course: Course, session: string, semester: string){
    
    let fields = course.session.find(c => (c.sessionName == session) && (c.semester.toLowerCase() == semester.toLowerCase()));

    if(!fields)  throw new Error("extractDataFromCourse function: could not find a match, "+ fields);

    delete course.session;
    return { ...course, ...fields }
}


