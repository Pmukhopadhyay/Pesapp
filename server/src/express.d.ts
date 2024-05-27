// express.d.ts
declare namespace Express {
    export interface Request {
        user?: any; // Add this line to define the user property
    }
}
