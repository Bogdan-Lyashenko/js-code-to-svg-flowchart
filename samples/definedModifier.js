function print(list) {
    const newList = list.map(i => {
        return i + 1;
    });
    newList.forEach(i => {
        console.debug('iteration start');
        console.log(i);
        console.debug('iteration end');
    });
}