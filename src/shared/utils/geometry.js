export const calculateShapesBoundaries = list => {
    if (!list || !list.length) {
        throw new Error('List is not specified.');
    }

    const first = list[0];
    let minX = first.min.x,
        maxX = first.max.x,
        minY = first.min.y,
        maxY = first.max.y;

    list.forEach(({ min, max }) => {
        if (min.x < minX) {
            minX = min.x;
        }

        if (min.y < minY) {
            minY = min.y;
        }

        if (max.x > maxX) {
            maxX = max.x;
        }

        if (max.y > maxY) {
            maxY = max.y;
        }
    });

    return {
        min: { x: minX, y: minY },
        max: { x: maxX, y: maxY }
    };
};

export const addOffsetToPoints = (points, offsetPoint) =>
    [].concat(points).map(point => ({
        x: point.x + offsetPoint.x,
        y: point.y + offsetPoint.y
    }));
