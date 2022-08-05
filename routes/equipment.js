module.exports = function (fastify, opts, done) {
	const Router = fastify;

	Router.get("/", (req, res) => {
		res.status(400).send({
			status: 400,
			error: {
				message: "No argument is given!"
			}
		});
	});

	Router.get("/:id", async (req, res) => {
		if (req.query.id) {
			const isId = Boolean(req.query.id === "true");
			if (isId) {
				const cache = await ba.Cache.get(req.params.id);
				if (cache) {
					res.status(200).send({
						status: 200,
						data: cache.data,
						drop: cache.drop
					});

					return;
				}

				const data = ba.BlueArchiveEquipment.get(Number(req.params.id));
				if (data) {
					const drops = ba.BlueArchiveDrop.get(data?.ID) ?? [];

					res.status(200).send({
						status: 200,
						data,
						drop: drops
					});

					return;
				}
			}
		}
		else {
			const item = req.params.id.toLowerCase();

			const tierRegex = /^t[1-6] (.*)$/;
			const tierMatch = item.match(tierRegex);
			if (tierMatch) {
				const id = await ba.Utils.getEquipmentTypes(item);
				if (id) {
					const cache = await ba.Cache.get(id);
					if (cache) {
						res.status(200).send({
							status: 200,
							data: cache.data,
							drop: cache.drop
						});

						return;
					}

					const data = ba.BlueArchiveEquipment.get(id);
					if (data) {
						const drops = ba.BlueArchiveDrop.get(data?.ID) ?? [];
						res.status(200).send({
							status: 200,
							data,
							drop: drops
						});

						await ba.Cache.set({
							key: id,
							value: JSON.stringify({
								data,
								drop: drops
							}),
							expireAt: 1_800_000
						});

						return;
					}
				}
			}

			const cache = await ba.Cache.get(item);
			if (cache) {
				res.status(200).send({
					status: 200,
					data: cache.data,
					drop: cache.drop
				});

				return;
			}

			const data = ba.BlueArchiveEquipment.get(item);
			if (data) {
				const drops = ba.BlueArchiveDrop.get(data?.ID) ?? [];
				res.status(200).send({
					status: 200,
					data,
					drop: drops
				});

				await ba.Cache.set({
					key: item,
					value: JSON.stringify({
						data,
						drop: drops
					}),
					expireAt: 1_800_000
				});

				return;
			}
		}

		res.status(404).send({
			status: 404,
			error: {
				message: "No equipment exists with this ID / Name!"
			}
		});
	});

	done();
};
