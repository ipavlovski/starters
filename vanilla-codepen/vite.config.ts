import { defineConfig, loadEnv } from 'vite'

import path from 'path'
import colors from 'picocolors'
import { compileFile } from 'pug'
import type { LocalsObject, Options } from 'pug'
import type { Plugin as VitePlugin } from 'vite'

type PluginOptions = { pugOptions?: Options; pugLocals?: LocalsObject }
function PugPlugin({ pugOptions = {}, pugLocals = {} }: PluginOptions): VitePlugin {
  return {
    name: 'vite-plugin-pug-transformer',

    handleHotUpdate({ file, server }) {
      if (file.endsWith('.pug')) {
        server.config.logger.info(
          colors.green('page reload ') + colors.dim(path.posix.relative(file, server.config.root)),
          { clear: true, timestamp: true }
        )

        server.ws.send({
          type: 'full-reload',
        })

        return []
      }
    },

    transformIndexHtml: {
      enforce: 'pre',
      transform(html, { filename }) {
        const updatedHtml = html.replace(
          /<template.*?data-type="pug".*?(\/>|<\/template>)/g,
          (matchedString) => {
            const [, rawTemplatePath] = matchedString.match(/data-src=["'](.*?)["']/) || []

            if (!rawTemplatePath) {
              throw new Error(`Template path not specified for ${matchedString}`)
            }

            const entryFileDir = filename.replace(/(.*)\/.*\.html$/, '$1')
            const templateFilePath = path.join(entryFileDir, rawTemplatePath)

            return compileFile(templateFilePath, pugOptions)(pugLocals)
          }
        )

        return updatedHtml
      },
    },
  }
}

export default ({ mode }: { mode: string }) => {
  // use import.meta.env.VITE_VAR in the code, eg.:
  // const SERVER_URL = `https://localhost:${import.meta.env.VITE_SERVER_PORT}`
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [PugPlugin({})],

    server: {
      port: parseInt(process.env.VITE_PORT!),
      host: true,
      https: {
        key: `${process.env.HOME}/.config/ssl/homelab/homelab.key`,
        cert: `${process.env.HOME}/.config/ssl/homelab/homelab.crt`,
      },
    },

    resolve: {
      alias: [
        {
          find: 'components',
          replacement: `${__dirname}/components`,
        },
      ],
    },

    css: {
      modules: { localsConvention: 'camelCaseOnly' },
    },
  })
}
