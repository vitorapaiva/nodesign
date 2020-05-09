// imports

module.exports = () => {
    const controller = {};

    controller.login = async(request, response, next) => {
        try {
            //
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }

    return controller;
}
