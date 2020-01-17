'use strict';

import AlbumEntity from '../entities/AlbumEntity.js';
import AlbumHandler from '../handlers/AlbumHandler.js';
import Factory from '../Factory.js';

/**
 * Add helpers methods to AlbumEntity
 */
class Album extends AlbumEntity {

	/**
   * @param {Object} data Album object
   */
  constructor(data) {
    super(data);
  }
}

/**
 * Exports the Playlist class.
 */
export default Album;
