## Investigación aplicada 1 ##

### Ejecutando DOCKER ###

Construir la imagen

```
docker build -t api-web-lis .
```

Para verificar que la imagen se creo
```
docker images
```

Ejecuta el contenedor Docker
```
docker run -d -p 4000:4000 --name api-web-lis api-web-lis
```

Para verificar que el contenedor esta ejecutándose
```
docker ps
```

Aqui la api estaria funcionando mediante docker

### Configurando Kubernetes ###

Instalar en PowerShell Minikube para configurar kubernetes
```
winget install Kubernetes.minikube
```

Activar servicio de minikube
```
minikube start
```

Entrar al cluster de minikube para luego hacer una build internamente de docker

```
minikube docker-env | Invoke-Expression
```

Construir la imagen
```
docker build -t api-web-lis .
```

Para ver los nodos que existen al crear el cluster
```
kubectl get nodes
```

Para ver los pods que se ejecutan
```
kubectl get nodes
```

Crea el deployment
```
kubectl apply -f ./load-balancer/deployment.yaml
```

Verifica el deployment
```
kubectl get pods
```

### Configurando servicio de LoadBalancer ###

Exponer la API a traves del servicio de LoadBalancer
```
kubectl apply -f ./load-balancer/service.yaml
```

Verifica el estado del servicio
```
kubectl get svc api-web-lis-loadbalancer
```

Redireccion de puerto por si no funciona con la configuración actual
```
kubectl port-forward svc/api-web-lis-loadbalancer 30000:4000
```

Activar tunnel por medio de minikube para exponer la API
```
minikube tunnel
``` 


### Configurando servicio de HPA (HorizontalPodAutoscaler) ###

Aplicar el hpa al cluster

```
kubectl apply -f hpa.yaml
```


Si el Metrics Server no está instalado
Ejecutar el siguiente comando para descargar el archivo YAML de configuración
```
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

Activar el servicio de Metrics Server
```
minikube addons enable metrics-server
```

Verificar estado de metrics-server:
```
kubectl get pods -n kube-system
```

Verificar el estado del hpa
```
kubectl get hpa
```

Generar carga para ver como las replicas aumentan. Esta puede generarse a través de <b>Postman</b> o como alternativa:
```
kubectl run load-generator --image=busybox --restart=Never -- /bin/sh -c "while true; do wget -q -O- http://localhost:80:80/; done"
```