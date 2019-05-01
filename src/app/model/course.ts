export interface Course{
    courseCode: string;
    courseName: string;
    lecturer: object;
    units: string;
    session: [{
        sessionName: string;
        lecturer: object;
        courseMaterial: object;
        courseOutline: object;
        semester: string;
    }];
    courseMaterial: Array<object>;
    courseOutline?: object;
    syllabus: Array<object>;
    programme: object;
    
}
