const code = `
    const doStuff = (stuff) => {
        if (stuff) {
            if (devFlag) {
                log('perf start');
                doRecursion();
                log('perf end');

                return;
            }

            doRecursion();
            end();
        } else {
            throw new Error('No stuff!');
        }

        return null;
    };
`;
