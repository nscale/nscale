```js
{
  global: {
    run_containers: false,
    tail: true,
    dns_enabled: true,
    monitor: false,
    monitor_excludes: ['**/node_modules/**', '**/.git/**', '*.log'],
    restart_on_error: true,
    auto_generate_environment: true,
    container_engine_url: '',
    dns_host: '0.0.0.0',
    dns_port: 53053,
    dns_suffix: '',
    dns_namespace: '',
    environment: {},
    delay_start: 0,
    max_restarts: 5,
    host: '127.0.0.1',
    dns: {
      A: {
        runme: { address: '127.0.0.1' },
        runmetoo: { address: '127.0.0.1' }
      },
      SRV: {
        '_main._tcp.runme': {
          address: '127.0.0.1',
          cname: 'runme',
          port: '8000'
        },
        '_main._tcp.runmetoo': {
          address: '127.0.0.1',
          cname: 'runmetoo',
          port: '8001'
        }
      }
    },
    log_path:
      '/Users/mikelindenau/Stacks/emmu/emmu-cli/test/fixtures/system/emmu/log'
  },
  topology: {
    containers: {
      runme: {
        type: 'node',
        path:
          '/Users/mikelindenau/Stacks/emmu/emmu-cli/test/fixtures/system/runme',
        run: 'node runme.js',
        ports: { main: ['8000', undefined] },
        name: 'runme',
        specific: {},
        environment: {
          RUNME_SERVICE_HOST: '127.0.0.1',
          RUNME_SERVICE_PORT: '8000',
          RUNME_PORT: 'tcp://127.0.0.1:8000',
          RUNME_PORT_8000_TCP: 'tcp://127.0.0.1:8000',
          RUNME_PORT_8000_TCP_PROTO: 'tcp',
          RUNME_PORT_8000_TCP_PORT: '8000',
          RUNME_PORT_8000_TCP_ADDR: '127.0.0.1',
          DNS_HOST: '0.0.0.0',
          DNS_PORT: 53053,
          DNS_NAMESPACE: '',
          DNS_SUFFIX: '',
          RUNMETOO_SERVICE_HOST: '127.0.0.1',
          RUNMETOO_SERVICE_PORT: '8001',
          RUNMETOO_PORT: 'tcp://127.0.0.1:8001',
          RUNMETOO_PORT_8001_TCP: 'tcp://127.0.0.1:8001',
          RUNMETOO_PORT_8001_TCP_PROTO: 'tcp',
          RUNMETOO_PORT_8001_TCP_PORT: '8001',
          RUNMETOO_PORT_8001_TCP_ADDR: '127.0.0.1',
          SERVICE_HOST: '127.0.0.1',
          SERVICE_PORT: '8000'
        },
        host: '127.0.0.1',
        tail: true,
        monitor: false,
        monitor_excludes: ['**/node_modules/**', '**/.git/**', '*.log'],
        delay_start: 0,
        restart_on_error: true,
        max_restarts: 5,
        auto_generate_environment: true,
        dns_suffix: '',
        dns_namespace: '',
        dns_enabled: true,
        process: {
          history: [],
          flags: {},
          child: null,
          colour: null,
          monitor: null
        }
      },
      runmetoo: {
        type: 'process',
        path:
          '/Users/mikelindenau/Stacks/emmu/emmu-cli/test/fixtures/system/runmetoo',
        run: 'node runmetoo.js',
        ports: { main: ['8001', undefined] },
        name: 'runmetoo',
        specific: {},
        environment: {
          RUNME_SERVICE_HOST: '127.0.0.1',
          RUNME_SERVICE_PORT: '8000',
          RUNME_PORT: 'tcp://127.0.0.1:8000',
          RUNME_PORT_8000_TCP: 'tcp://127.0.0.1:8000',
          RUNME_PORT_8000_TCP_PROTO: 'tcp',
          RUNME_PORT_8000_TCP_PORT: '8000',
          RUNME_PORT_8000_TCP_ADDR: '127.0.0.1',
          DNS_HOST: '0.0.0.0',
          DNS_PORT: 53053,
          DNS_NAMESPACE: '',
          DNS_SUFFIX: '',
          RUNMETOO_SERVICE_HOST: '127.0.0.1',
          RUNMETOO_SERVICE_PORT: '8001',
          RUNMETOO_PORT: 'tcp://127.0.0.1:8001',
          RUNMETOO_PORT_8001_TCP: 'tcp://127.0.0.1:8001',
          RUNMETOO_PORT_8001_TCP_PROTO: 'tcp',
          RUNMETOO_PORT_8001_TCP_PORT: '8001',
          RUNMETOO_PORT_8001_TCP_ADDR: '127.0.0.1',
          SERVICE_HOST: '127.0.0.1',
          SERVICE_PORT: '8001'
        },
        host: '127.0.0.1',
        tail: true,
        monitor: false,
        monitor_excludes: ['**/node_modules/**', '**/.git/**', '*.log'],
        delay_start: 0,
        restart_on_error: true,
        max_restarts: 5,
        auto_generate_environment: true,
        dns_suffix: '',
        dns_namespace: '',
        dns_enabled: true,
        process: {
          history: [],
          flags: {},
          child: null,
          colour: null,
          monitor: null
        }
      }
    }
  }
}
```
