function resolvePromiseAll(iterator) {

	const result = new Array(iterator.length);
	console.log("result", result);
	let resolveCount = 0;

	return new Promise((resolve, reject) => {
		for (let i = 0; i < iterator.length; i++) {
			iterator[i].then((data) => {

				result[i] = data;
				resolveCount++;

				if (resolveCount === iterator.length) {
					resolve(result)
				}

			}).catch(error => {
				reject(error)
			})

		}
	})
}


function task(time) {
	return new Promise(function (res, rej) {
		setTimeout(function () {
			res(time);
		}, time)
	})
	// return new Promise((res, rej)=> ()=>res(time), time)
}

const promises = [task(300), task(450), task(33)]

// console.log("da'dsa", await resolvePromiseAll(promises));

resolvePromiseAll(promises).then(res => {
	console.log("got result", res);

}).catch((err) => {
	console.log(err)
})