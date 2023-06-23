import {validateOrReject, ValidationError} from 'class-validator';
import {NextFunction, Request, Response} from 'express';
import {plainToInstance} from 'class-transformer';
// import {HttpException} from "@exceptions";

export const ValidationMiddleware = (dtoClass: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {

        // Convert request body to DTO instance
        const dto = plainToInstance(dtoClass, req.body);
        

        // Validate DTO against defined constraints
        validateOrReject(dto).then(() => {
            req.body = dto
            next()
        }).catch((errors: ValidationError[]) => {
            const errorMessages: any[] = []
            const error = errors.map((error: ValidationError) => {

                    if(error.children && error.children.length > 0){
                        error.children.forEach((element) => {
                            if(element.children && element.children.length > 0){
                                element.children.forEach((elementChild) => {

                                    // @ts-ignore
                                    errorMessages.push(`[${element.property}] ` + Object.values(elementChild.constraints))
                                })
                            }else{
                                // @ts-ignore
                                errorMessages.push(`[${error.property}] ` + Object.values(element.constraints))
                            }
                        })
                    }

                    else{
                        // @ts-ignore
                        errorMessages.push(`[${error.property}] ` + Object.values(error.constraints))
                    }

                }
            );

            next(new Error(`400|${errorMessages.join('; ')}`))
        })

    } catch (err: any) {
        // If an unexpected error occurs, pass control to Express error handler
        next(new Error(err))
    }
};                               