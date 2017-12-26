import {format} from './util/string';
function formatName(name) {
    if (!name) return 'no-name';
    return format(name);
}
class Animal {
    constructor(breed) {
        this.breed = breed;
    }
    getBreed() {
        return this.breed;
    }
    setName(name) {
        if (this.nameExist()) {
            return;
        }
        this.name = name;
    }
}
class Man extends Animal {
    sayName() {
        console.log('name', this.name);
    }
}