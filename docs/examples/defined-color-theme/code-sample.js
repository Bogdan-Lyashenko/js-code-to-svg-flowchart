const code = `
    function switchSampleFromMDN() {
        const foo = 0;

        switch (foo) {
          case -1:
            console.log('negative 1');
            break;
          case 0:
            console.log(0);
          case 1:
            console.log(1);
            return 1;
          default:
            console.log('default');
        }
    }
`;
