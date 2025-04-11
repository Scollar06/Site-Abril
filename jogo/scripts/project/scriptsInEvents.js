

const scriptsInEvents = {

	async FolhaDeOverword2_Event8(runtime, localVars)
	{
		const ghasts = ["ghast", "ghast2", "ghast3", "ghast4", "ghast5", "ghast6"];
		const alexList = runtime.objects.alexselect?.instances() || [];
		
		for (const name of ghasts) {
		    const ghastList = runtime.objects[name]?.instances() || [];
		
		    for (const ghast of ghastList) {
		        // Inicializa direção se não tiver
		        if (typeof ghast.direction === "undefined") {
		            ghast.direction = 1;
		        }
		
		        ghast.x += ghast.direction * 3;
		
		        // Inverter ao bater nas bordas
		        if (
		            ghast.x > runtime.layout.width - ghast.width / 2 ||
		            ghast.x < ghast.width / 2
		        ) {
		            ghast.direction *= -1;
		        }
		
		        // Inverter ao colidir com qualquer instância de alexselect
		        for (const alex of alexList) {
		            if (ghast.testOverlap(alex)) {
		                ghast.direction *= -1;
		                 // evitar múltiplas inversões no mesmo frame
		            }
		        }
		    }
		}
		
	},

	async FolhaDeOverword_Event10(runtime, localVars)
	{
		const zombis = runtime.objects.zombi?.instances() || [];
		const alexes = runtime.objects.alexselect?.instances() || [];
		
		for (const zombi of zombis) {
		    // Inicializa direção se necessário
		    if (typeof zombi.behaviorDir === "undefined") {
		        zombi.behaviorDir = 1;
		    }
		
		    // Movimento
		    zombi.x += zombi.behaviorDir * 3;
		
		    // Inverte nas bordas
		    if (
		        zombi.x > runtime.layout.width - zombi.width / 2 ||
		        zombi.x < zombi.width / 2
		    ) {
		        zombi.behaviorDir *= -1;
		    }
		
		    // Inverte se colidir com qualquer alexselect
		    for (const alex of alexes) {
		        if (zombi.testOverlap(alex)) {
		            zombi.behaviorDir *= -1;
		            break;
		        }
		    }
		}
		
	}
};

self.C3.ScriptsInEvents = scriptsInEvents;
