import * as plPlus from './indexEntry.js';

for (var key in plPlus) {
	global[key] = plPlus[key];
}

export * from './indexEntry.js';