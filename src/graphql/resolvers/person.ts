import {IResolvers} from 'graphql-tools'
import data from '../../data/data.json'

export const personResolvers : IResolvers = {
    Query:{
        getPerson(__: void, args: any){
            const [find] = data.people.filter(p => p.id ===args.id)
            console.log(find)
            return find
        }
    },
    Person: {
        __resolveType(obj: any){
            return obj.age ? "Male" : "Female"
        }
    }
}