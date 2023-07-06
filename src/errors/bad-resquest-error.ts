import { ApplicationError } from '@/protocols';

export function badRequest(): ApplicationError {
    return {
        name: 'BAD REQUEST',
        message: 'No result for this search!',
    };
}
