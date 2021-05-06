import getTypesAttributes from './getTypesAttributes.js';

export default async (type1, type2 = false) => {

    const typesAtrributes = await getTypesAttributes(type1, type2);
    let typesWeaknesses = [];

    function removeRepetition(list){
        
        list = list.reduce((unique, item) => {

            return unique.includes(item) ? unique : [...unique, item];
        }, []);

        return list;
    }

    function findFinalWeaknesses(weaknesses, half_damage_from, immunities){
        
        weaknesses = weaknesses.reduce((selectWeaknesses, weakness) => {
            return immunities.includes(weakness) ? selectWeaknesses : [...selectWeaknesses, weakness];
        }, []);

        weaknesses = weaknesses.reduce((selectWeaknesses, weakness) => {
            return half_damage_from.includes(weakness) ? selectWeaknesses : [...selectWeaknesses, weakness];
        }, []);

        return weaknesses;
    }

    function formatWeaknessesNames(weaknessesNames){
        
        weaknessesNames.sort();

        weaknessesNames = weaknessesNames.map(weaknessName => {
            return  {name: weaknessName};
        });
        
        return weaknessesNames;
    }

    if (type2) {
        const type1Attributes = typesAtrributes[0];
        const type2Attributes = typesAtrributes[1];
        let type1Weaknesses = [];
        let type2Weaknesses = [];
        let groupedTypesWeaknesses = [];
        let type1HalfDamageFrom = [];
        let type2HalfDamageFrom = [];
        let groupedHalfDamageFrom = [];
        let type1ImmuneFrom = [];
        let type2ImmuneFrom = [];
        let groupedTypesImmunities = [];

        type1Weaknesses.push(
            type1Attributes.damage_relations.double_damage_from.map(d_d_from => {
                return d_d_from.name;
            })
        );
        
        type2Weaknesses.push(
            type2Attributes.damage_relations.double_damage_from.map(d_d_from => {
                return d_d_from.name; 
            })
        );
        groupedTypesWeaknesses = removeRepetition(type1Weaknesses[0].concat(type2Weaknesses[0]));

        type1HalfDamageFrom.push(
            type1Attributes.damage_relations.half_damage_from.map(n_d_from => {
                return n_d_from.name;
            })
        );
        type2HalfDamageFrom.push(
            type2Attributes.damage_relations.half_damage_from.map(n_d_from => {
                return n_d_from.name;
            })
        );
        groupedHalfDamageFrom = removeRepetition(type1HalfDamageFrom[0].concat(type2HalfDamageFrom[0]));
        
        type1ImmuneFrom.push(
            type1Attributes.damage_relations.no_damage_from.map(n_d_from => {
                return n_d_from.name;
            })
        );
        type2ImmuneFrom.push(
            type2Attributes.damage_relations.no_damage_from.map(n_d_from => {
                return n_d_from.name;
            })
        );
        groupedTypesImmunities = removeRepetition(type1ImmuneFrom[0].concat(type2ImmuneFrom[0]));
        
        typesWeaknesses = findFinalWeaknesses(groupedTypesWeaknesses, groupedHalfDamageFrom, groupedTypesImmunities);

        typesWeaknesses = formatWeaknessesNames(typesWeaknesses);
        
    } else {
        const type1Attributes = typesAtrributes[0];

        typesWeaknesses.push(
            type1Attributes.damage_relations.double_damage_from.map(d_d_from => {
                return {name: d_d_from.name};
            })
        );

        typesWeaknesses = typesWeaknesses[0];
    }
    
    return typesWeaknesses;
}
